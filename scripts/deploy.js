const fs = require('fs');
const path = require('path');
const { NodeSSH } = require('node-ssh');
const archiver = require('archiver');
require('dotenv').config({ path: '.env.local' });

const ssh = new NodeSSH();

// Config
const CONFIG = {
  host: '187.124.170.134',
  username: 'root',
  password: process.env.VPS_PASSWORD,
  localArchive: path.join(__dirname, '../deploy.zip'),
  remoteArchive: '/root/deploy.zip',
  remoteDir: '/var/www/faruk',
};

async function createArchive() {
  return new Promise((resolve, reject) => {
    console.log('📦 Proje paketleniyor (node_modules ve .next hariç)...');
    const output = fs.createWriteStream(CONFIG.localArchive);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`✅ Paketleme tamamlandı (Boyut: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
      resolve();
    });

    archive.on('error', (err) => reject(err));
    archive.pipe(output);

    archive.glob('**/*', {
      cwd: path.join(__dirname, '..'),
      ignore: [
        'node_modules/**',
        '.next/**',
        '.git/**',
        'deploy.zip',
        'scripts/deploy.js'
      ],
      dot: true
    });

    archive.finalize();
  });
}

async function deploy() {
  if (!CONFIG.password) {
    console.error('❌ HATA: .env.local dosyasında VPS_PASSWORD bulunamadı!');
    process.exit(1);
  }

  try {
    await createArchive();

    console.log(`🌐 Sunucuya bağlanılıyor (${CONFIG.host})...`);
    await ssh.connect({
      host: CONFIG.host,
      username: CONFIG.username,
      password: CONFIG.password,
    });
    console.log('✅ Bağlantı başarılı.');

    console.log('🚀 Dosyalar sunucuya yükleniyor (Lütfen bekleyin)...');
    await ssh.putFile(CONFIG.localArchive, CONFIG.remoteArchive);
    console.log('✅ Yükleme tamamlandı.');

    console.log('⚙️ Sunucudaki eski dosyalar temizlenip yenileri çıkartılıyor...');
    const commands = [
      `mkdir -p ${CONFIG.remoteDir}`,
      `unzip -o ${CONFIG.remoteArchive} -d ${CONFIG.remoteDir}`,
      `rm -f ${CONFIG.remoteArchive}`,
      `cd ${CONFIG.remoteDir} && npm install`,
      `cd ${CONFIG.remoteDir} && npm run build`,
      `pm2 restart faruk-site`
    ];

    for (const cmd of commands) {
      console.log(`> ${cmd}`);
      const result = await ssh.execCommand(cmd);
      if (result.stdout) console.log(result.stdout);
      if (result.stderr && !result.stderr.includes('npm WARN') && !result.stderr.includes('npm notice')) {
         console.warn(result.stderr);
      }
    }

    console.log('🎉 DEPLOY BAŞARILI! Siteniz güncel.');
    
    // Cleanup local archive
    fs.unlinkSync(CONFIG.localArchive);
    process.exit(0);

  } catch (error) {
    console.error('❌ Deploy sırasında hata oluştu:', error);
    process.exit(1);
  }
}

deploy();
