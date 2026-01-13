import { Navigate } from 'react-router-dom';
import { useGetApiAuthProfile } from '@/api/generated/authentication/authentication';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/api/generated/models';
import { queryConfig } from '@/lib/queryConfig';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const { data: profileData, isLoading } = useGetApiAuthProfile({
    query: {
      ...queryConfig.userProfile,
    },
  });
  const user = profileData?.user;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || user.role !== UserRole.admin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
