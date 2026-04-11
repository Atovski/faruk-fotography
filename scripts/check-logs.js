const { NodeSSH } = require('node-ssh');
require('dotenv').config({ path: '.env.local' });

const ssh = new NodeSSH();

async function checkLogs() {
  try {
    await ssh.connect({
      host: '187.124.170.134',
      username: 'root',
      password: process.env.VPS_PASSWORD,
    });
    const result = await ssh.execCommand('pm2 logs faruk-site --lines 50 --nostream');
    console.log(result.stdout);
    if (result.stderr) console.error(result.stderr);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

checkLogs();
