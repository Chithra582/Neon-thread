import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { ShieldAlert, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

interface RoleAccessGuardProps {
  requiredRole: UserRole | UserRole[];
  currentRole: UserRole;
  featureTitle: string;
}

export const RoleAccessGuard: React.FC<RoleAccessGuardProps> = ({
  requiredRole,
  currentRole,
  featureTitle
}) => {
  const { authUser, openAuthModal, setActiveTab } = useApp();

  const requiredRolesList = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  const targetRole = requiredRolesList[0];

  const getRoleDisplayName = (r: UserRole) => {
    if (r === 'student') return 'Student / Candidate';
    if (r === 'employer') return 'Enterprise Employer';
    if (r === 'mentor') return 'Industry Mentor';
    return 'Platform Administrator';
  };

  const getPrimaryRoleHomeTab = (r: UserRole) => {
    if (r === 'student') return 'student-profile';
    if (r === 'employer') return 'employer-dashboard';
    if (r === 'mentor') return 'mentor-checkin';
    return 'admin-analytics';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="bg-[#0e1424] border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Lock className="w-8 h-8 text-amber-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Role Access Boundary</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          {featureTitle} requires an {getRoleDisplayName(targetRole)} account
        </h2>

        <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
          On Neon Thread, roles are strictly bound to authenticated Google accounts to guarantee proof integrity. You are currently signed in as{' '}
          <strong className="text-white">{authUser?.name || 'Current User'}</strong> with the{' '}
          <span className="font-mono text-cyan-300 font-semibold uppercase">[{currentRole}]</span> role.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="btn-guard-switch-account"
            onClick={() => openAuthModal('signin', targetRole)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-98"
          >
            <span>Sign in with a {getRoleDisplayName(targetRole)} Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-guard-return-home"
            onClick={() => setActiveTab(getPrimaryRoleHomeTab(currentRole))}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to My {getRoleDisplayName(currentRole)} View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
