import MainLayout from "components/MainLayout";
import Wizard, { WizardPage } from "components/Wizard";
import { useFirebase } from "context/firebase";
import { useCreateProfile } from "hooks/api/use-profile";
import { PersonalInfo } from "./PersonalInfo";
import { ProfessionalInfo } from "./ProfessionalInfo";

const CreateProfile = () => {
  const { token, user } = useFirebase()
  const {createProfile, isLoading} = useCreateProfile(token)

  async function onSubmit(values: any) {
    const {profileType, ...rest} = values
    const data = {...rest, uid: user?.uid, email: user?.email}
    console.log("data: ", data)
    createProfile({profileType, data} as any)
  }

  return (
    <MainLayout title="Complete your profile">
      <Wizard onSubmit={onSubmit} submitting={isLoading}>
        <WizardPage title="Presonal Information">
          <PersonalInfo />
        </WizardPage>
        <WizardPage title="Professional Information">
          <ProfessionalInfo />
        </WizardPage>
      </Wizard>
    </MainLayout>
  );
};

export default CreateProfile;
