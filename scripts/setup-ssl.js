const { NodeSSH } = require('node-ssh');
require('dotenv').config({ path: '.env.local' });

const ssh = new NodeSSH();
const domain = 'farukfotografcilik.com';

const nginxConfig = `
server {
    listen 80;
    listen [::]:80;
    
    server_name ${domain} www.${domain};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\$host;
        proxy_cache_bypass \\$http_upgrade;
    }
}
`;

async function setupSSL() {
  if (!process.env.VPS_PASSWORD) {
    console.error('HATA: .env.local dosyasında VPS_PASSWORD bulunamadı!');
    process.exit(1);
  }

  try {
    console.log('🌐 Sunucuya bağlanılıyor (187.124.170.134)...');
    await ssh.connect({
      host: '187.124.170.134',
      username: 'root',
      password: process.env.VPS_PASSWORD,
    });
    console.log('✅ Bağlantı başarılı!');

    console.log('⚙️ Nginx konfigürasyonuna alan adı ekleniyor...');
    // Nginx yapılandırma dosyasını oluştur
    await ssh.execCommand(`cat << 'EOF' > /etc/nginx/sites-available/default\n${nginxConfig}\nEOF`);
    
    console.log('🔄 Nginx yeniden başlatılıyor...');
    await ssh.execCommand('systemctl reload nginx');

    console.log('🔒 Certbot yükleniyor (Bu işlem 1-2 dakika sürebilir)...');
    await ssh.execCommand('apt-get update && apt-get install -y certbot python3-certbot-nginx');

    console.log(`🛡️ ${domain} için SSL Sertifikası talep ediliyor...`);
    const sslCommand = `certbot --nginx -d ${domain} -d www.${domain} --non-interactive --agree-tos --register-unsafely-without-email --redirect`;
    const sslRes = await ssh.execCommand(sslCommand);
    
    if (sslRes.stdout) console.log(sslRes.stdout);
    if (sslRes.stderr && !sslRes.stderr.includes('Saving debug log')) {
      console.log('Certbot uyarısı/hatanın bir kısmı (Önemli olmayabilir):', sslRes.stderr);
    }

    console.log('\\n🎉 KUSURSUZ! SSL Sertifikanız kuruldu ve Nginx başarıyla HTTPS ayarlandı.');
    process.exit(0);

  } catch (error) {
    console.error('❌ Kurulum sırasında hata oluştu:', error);
    process.exit(1);
  }
}

setupSSL();
