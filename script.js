const stepsData = [
{
title: "Disable Cloud-init",
desc: "Prevents snapshot network override",
cmd: "echo \"network: {config: disabled}\" > /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg"
},
{
title: "Fix Netplan DNS",
desc: "Set correct DNS servers",
cmd: "nano /etc/netplan/*.yaml\n\nnameservers:\n  addresses:\n    - 8.8.8.8\n    - 1.1.1.1\n\nnetplan apply"
},
{
title: "Unlock resolv.conf",
desc: "Remove file lock",
cmd: "chattr -i /etc/resolv.conf\nrm -f /etc/resolv.conf"
},
{
title: "Fix systemd-resolved",
desc: "Enable DNS service",
cmd: "systemctl unmask systemd-resolved\nsystemctl enable systemd-resolved\nsystemctl start systemd-resolved"
},
{
title: "Link resolv.conf",
desc: "Reconnect DNS system",
cmd: "ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf"
},
{
title: "Set DNS",
desc: "Add global DNS",
cmd: "nano /etc/systemd/resolved.conf\n\nDNS=8.8.8.8 1.1.1.1\nFallbackDNS=8.8.4.4 1.0.0.1\n\nsystemctl restart systemd-resolved"
},
{
title: "Test DNS",
desc: "Check connectivity",
cmd: "ping google.com"
},
{
title: "Fix apt",
desc: "Update packages",
cmd: "apt update"
},
{
title: "Repair CyberPanel",
desc: "Fix panel",
cmd: "sh <(curl https://cyberpanel.net/install.sh)"
}
];

let completed = 0;

function renderSteps() {
    const container = document.getElementById("steps");

    stepsData.forEach((step, index) => {
        container.innerHTML += `
        <div class="step">
            <h3>${step.title}</h3>
            <p>${step.desc}</p>
            <div class="code">${step.cmd}</div>
            <button onclick="copyText(${index})">Copy</button>
            <button onclick="markDone(this)">Done</button>
        </div>`;
    });
}

function copyText(i) {
    navigator.clipboard.writeText(stepsData[i].cmd);
}

function copyAll() {
    let all = stepsData.map(s => s.cmd).join("\n\n");
    navigator.clipboard.writeText(all);
    alert("All commands copied!");
}

function toggleTheme() {
    document.body.classList.toggle("light");
}

function markDone(btn) {
    btn.disabled = true;
    completed++;
    let percent = Math.floor((completed / stepsData.length) * 100);
    document.getElementById("progressText").innerText = percent + "%";
    document.getElementById("barFill").style.width = percent + "%";
}

renderSteps();
