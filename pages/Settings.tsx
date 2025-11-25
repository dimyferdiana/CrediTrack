
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Icon, Switch } from "../components/UI";

export default function Settings() {
  const navigate = useNavigate();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const SectionHeader = ({ title }: { title: string }) => (
    <h3 className="px-4 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {title}
    </h3>
  );

  const MenuItem = ({ icon, label, onClick, rightElement }: { icon: string; label: string; onClick?: () => void; rightElement?: React.ReactNode }) => (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer active:bg-secondary/50"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon name={icon} />
        </div>
        <span className="font-medium text-base">{label}</span>
      </div>
      {rightElement || <Icon name="chevron_right" className="text-muted-foreground" />}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background/80 p-4 pb-2 backdrop-blur-sm border-b border-transparent">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate("/dashboard")}>
          <Icon name="arrow_back" />
        </Button>
        <h1 className="text-lg font-bold">Settings</h1>
        <div className="w-10" />
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center gap-4 p-6 pt-2">
        <div className="h-32 w-32 overflow-hidden rounded-full shadow-md border-4 border-card">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQet3XkjpyMwytS76-WV_6qOyf0Zq5EFDeTQ3usl7rBXD1qheX_uoNrpPaCUwXVb3vUJwW2fdUpesdBN-B5I9tcA32UjWgzR917kAm_kLQn8Qjn8meNxxQUSIsjLLgZ7lk_r2y9A0EQtHhCdpvSRgKKT5Pppqh_DNb0x9G5YeeSMhmGcJRD7LeHmvhpgwVKSoTtsz0la-88orrw3T5PxLi2JHESOBtrCR94yoUBVDdphalG44rYyP_JB3AGTmgmMrZQYkIs02IaMY"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">Alex Doe</h2>
          <p className="text-muted-foreground">alex.doe@email.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4 pb-32">
        {/* Account & Security */}
        <div>
          <SectionHeader title="Account & Security" />
          <Card className="overflow-hidden border border-border/50 bg-card shadow-sm divide-y divide-border/50">
            <MenuItem icon="person" label="Personal Details" />
            <MenuItem icon="account_balance" label="Manage Linked Accounts" />
            <MenuItem icon="lock" label="Change Password" />
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="fingerprint" />
                </div>
                <span className="font-medium text-base">Biometric ID</span>
              </div>
              <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <SectionHeader title="Notifications" />
          <Card className="overflow-hidden border border-border/50 bg-card shadow-sm divide-y divide-border/50">
             <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="notifications" />
                </div>
                <span className="font-medium text-base">Push Notifications</span>
              </div>
              <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
            </div>
             <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="mail" />
                </div>
                <span className="font-medium text-base">Email Notifications</span>
              </div>
              <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
            </div>
          </Card>
        </div>

        {/* App Settings */}
        <div>
          <SectionHeader title="App Settings" />
          <Card className="overflow-hidden border border-border/50 bg-card shadow-sm divide-y divide-border/50">
            <MenuItem icon="dark_mode" label="Appearance" />
            <MenuItem icon="help" label="Help & Support" />
            <MenuItem icon="info" label="About" />
          </Card>
        </div>

        {/* Logout */}
        <div className="space-y-4 pt-2">
          <Button variant="danger" className="w-full h-14 rounded-xl text-base font-bold shadow-sm" onClick={() => navigate('/login')}>
            <Icon name="logout" className="mr-2" />
            Log Out
          </Button>
          <p className="text-center text-xs text-muted-foreground font-medium">App Version 2.1.0</p>
        </div>
      </div>
    </div>
  );
}
