# 🚀 CyberPanel Snapshot Fix Guide

Fix common issues after restoring a snapshot:

## ❌ Problems
- Internal Error (port 8090)
- apt update fails
- DNS issues
- CyberPanel broken

---

## 🔥 Root Cause
- Broken DNS
- systemd-resolved disabled
- resolv.conf locked
- old snapshot config

---

## ✅ Quick Fix

```bash
chattr -i /etc/resolv.conf
rm -f /etc/resolv.conf

systemctl unmask systemd-resolved
systemctl enable systemd-resolved
systemctl start systemd-resolved

ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf

nano /etc/systemd/resolved.conf
