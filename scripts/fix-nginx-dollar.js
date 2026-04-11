const { NodeSSH } = require('node-ssh');
require('dotenv').config({ path: '.env.local' });
const ssh = new NodeSSH();
async function fix() {
  try {
    await ssh.connect({ host: '187.124.170.134', username: 'root', password: process.env.VPS_PASSWORD });
    const cmd = `sed -i 's|\\\\$http|\\$http|g' /etc/nginx/sites-available/default && sed -i 's|\\\\$host|\\$host|g' /etc/nginx/sites-available/default && systemctl reload nginx`;
    await ssh.execCommand(cmd);
    console.log('Fixed Nginx escaping issue.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fix();
