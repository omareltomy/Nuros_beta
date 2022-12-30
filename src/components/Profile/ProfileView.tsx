import { ComponentProps } from 'react';
import { IProfile } from 'interfaces/profile';
import MainLayout from 'components/MainLayout';
import { useRouter } from 'next/router';
import { useFirebase } from 'context/firebase';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

type IProps = ComponentProps<"div"> & { profile: IProfile }

const ProfileView = ({ profile }: IProps) => {
  const { push } = useRouter();
  const otherUserId = "userid";

  const { logoutUserFromFirebase, user, isFetchingUser } = useFirebase();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logoutUserFromFirebase();
    queryClient.clear();
  };

  return (
    <MainLayout title={`${profile.firstName}'s profile`}>
      <div>
        <pre>
          {JSON.stringify(profile, null, 2)}
        </pre>
        <div className='flex gap-2 my-10'>
          <button className='btn' onClick={() => push(`/video?user=${otherUserId}`)}>call user2</button>
          <button className='btn' onClick={() => handleLogout()}>logout</button>
          <Link href="/" className='btn'>Home</Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileView
