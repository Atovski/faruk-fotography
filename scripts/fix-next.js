const { NodeSSH } = require('node-ssh');
require('dotenv').config({ path: '.env.local' });
const ssh = new NodeSSH();

async function fix() {
  try {
    await ssh.connect({ host: '187.124.170.134', username: 'root', password: process.env.VPS_PASSWORD });
    console.log('Sunucuya bağlanıldı. Hatalı önbellek (cache) temizleniyor...');
    
    await ssh.execCommand('cd /var/www/faruk && rm -rf .next');
    
    console.log('Projeyi tekrar temiz bir şekilde derleniyor...');
    await ssh.execCommand('cd /var/www/faruk && npm run build');
    
    console.log('Sunucu servisi (PM2) yeniden başlatılıyor...');
    await ssh.execCommand('pm2 restart faruk-site');
    
    console.log('Tamamlandı! Hatanın giderilmiş olması gerekiyor.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fix();
