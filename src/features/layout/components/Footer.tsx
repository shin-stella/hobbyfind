'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bgMuted">
      <div className="container flex flex-col items-center gap-1 py-6 text-sm text-textMuted">
        <p className="font-medium text-text">HobbyFind</p>
        <p>© {currentYear} HobbyFind. All rights reserved.</p>
      </div>
    </footer>
  );
}
