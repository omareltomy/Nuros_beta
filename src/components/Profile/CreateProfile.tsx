import MainLayout from "components/MainLayout";
import Wizard, { WizardContext, WizardPage } from "components/Wizard";
import { useFirebase } from "context/firebase";
import { useCreateProfile } from "hooks/api/use-profile";
import { useState } from "react";
import { MoreProfInfo } from "./MoreProfInfo";
import { PersonalInfo } from "./PersonalInfo";
import { ProfessionalInfo } from "./ProfessionalInfo";

const CreateProfile = () => {
  const { token, user } = useFirebase()
  const { createProfile, isLoading } = useCreateProfile(token)

  async function onSubmit(values: any) {
    const { profileType, ...rest } = values
    const data = { ...rest, uid: user?.uid, email: user?.email }
    console.log("data: ", data)
    createProfile({ profileType, data } as any)
  }

  return (
    <MainLayout title="Complete your profile">
      <Wizard onSubmit={onSubmit} submitting={isLoading}>
        <WizardPage>
          <PersonalInfo />
        </WizardPage>
        <WizardPage>
          <ProfessionalInfo />
        </WizardPage>
        <WizardPage>
          <WizardContext.Consumer>
            {(v: any) => {
              if (v.profileType === "professional") {
                return (
                    <MoreProfInfo />
                    )
                  }
                }}
          </WizardContext.Consumer>
        </WizardPage>
        <WizardPage>
          <p>All set up, you'll receive an email shortly!</p>
        </WizardPage>
      </Wizard>
    </MainLayout>
  );
};

export default CreateProfile;
