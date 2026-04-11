const { NodeSSH } = require('node-ssh');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });
const ssh = new NodeSSH();
async function check() {
  await ssh.connect({ host: '187.124.170.134', username: 'root', password: process.env.VPS_PASSWORD });
  const conf = await ssh.execCommand('cat /etc/nginx/sites-available/default');
  fs.writeFileSync('nginx.txt', conf.stdout, 'utf8');
  process.exit(0);
}
check();
