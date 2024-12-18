import { useMyProfile } from "@/actions/_useProfiles";
import LearningLayout from "@/components/panel/layout/LearningLayout";
import LeftCol from "@/components/profiles/LeftCol";
import RightCol from "@/components/profiles/RightCol";
import { useAuth } from "@/context/authContext";
import { Skeleton } from "antd";
import React from "react";

const Student = () => {
  const [auth] = useAuth();
  const { profile, loading } = useMyProfile();
  return (
    <LearningLayout>
      <div class="container rounded bg-white mb-5" style={{ paddingTop: "50px" }}>
        <div class="row">
          {loading ? (
            <Skeleton active />
          ) : (
            <>
              {profile && <LeftCol user={auth?.user} skills={profile?.skills} social={profile?.social} bio={profile?.bio} />}
              <RightCol profile={profile} loading={loading} />
            </>
          )}
        </div>
      </div>
    </LearningLayout>
  );
};

export default Student;
