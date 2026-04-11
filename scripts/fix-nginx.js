const { NodeSSH } = require('node-ssh');
require('dotenv').config({ path: '.env.local' });
const ssh = new NodeSSH();

async function fixNginx() {
  try {
    await ssh.connect({ host: '187.124.170.134', username: 'root', password: process.env.VPS_PASSWORD });
    const cmd = `sed -i 's/localhost:3000/127.0.0.1:3000/g' /etc/nginx/sites-available/default && systemctl reload nginx`;
    await ssh.execCommand(cmd);
    console.log('Nginx config updated to IPv4 proxy.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fixNginx();
