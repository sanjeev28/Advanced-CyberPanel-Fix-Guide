#!/bin/bash

echo "🚀 Starting CyberPanel Fix..."

# Unlock resolv.conf
chattr -i /etc/resolv.conf 2>/dev/null

# Remove old DNS
rm -f /etc/resolv.conf

# Fix systemd-resolved
systemctl unmask systemd-resolved
systemctl enable systemd-resolved
systemctl start systemd-resolved

# Link DNS
ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf

# Set DNS
sed -i 's/^#DNS=.*/DNS=8.8.8.8 1.1.1.1/' /etc/systemd/resolved.conf
sed -i 's/^#FallbackDNS=.*/FallbackDNS=8.8.4.4 1.0.0.1/' /etc/systemd/resolved.conf

systemctl restart systemd-resolved

# Test
echo "Testing DNS..."
ping -c 2 google.com

# Update
apt update

echo "Fix completed!"
