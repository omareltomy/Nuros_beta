import { ComponentProps } from 'react';
import { IProfile } from 'interfaces/profile';
import MainLayout from 'components/MainLayout';
import { useRouter } from 'next/router';

type IProps = ComponentProps<"div"> & { profile: IProfile }

const ProfileView = ({ profile }: IProps) => {
  const { push } = useRouter();
  const otherUserId = "userid";

  return (
    <MainLayout title={`${profile.firstName}'s profile`}>
      <div>
        <pre>
          {JSON.stringify(profile, null, 2)}
        </pre>
        <button className='bg-green-500' onClick={() => push(`/video?user=${otherUserId}`)}>call user2</button>
      </div>
    </MainLayout>
  );
};

export default ProfileView
