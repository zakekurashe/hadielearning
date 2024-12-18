import { API } from "@/config/APIs";
import { test_links } from "@/data/test_links";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const formInitValues = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  parentName: "",
  parentOccupations: "",
  interest: "",
  wantToAchieve: "",
  email: "",
  gender: "",
  education: "",
  course: "",
  workshop: "",
  selectedEnrolled: "",
  enrollTo: "",
  dateOfBirth: "",
  phoneNumber: "",
  parentPhoneNumber: "",
  whatsAppphoneNumber: "",
  idCard: "",
  policyAccepted: false,
};

export const _useEnrollmentForm = ({ which }) => {
  const router = useRouter();
  const [enrollInto, setEnrollInto] = useState([]);
  const [userByEmail, setUserByEmail] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState({});
  const [loading, setLoading] = useState(false);
  const [_values, _setValues] = useState(formInitValues);
  const [finded, setFinded] = useState(false);

  const fetchingCourses = async () => {
    try {
      const { data } = await axios.get(`${API}/courses-form`);
      if (data.courses) {
        setEnrollInto(data.courses);
      }
    } catch (error) {
      toast.error("Failed, try again");
    }
  };

  const fetchingWorkshops = async () => {
    try {
      // const { data } = await axios.get(`${API}/workshops-form`);
      const { data } = await axios.get(`${API}/workshops-form`);
      if (data._workshops) {
        setEnrollInto(data._workshops);
      }
    } catch (error) {
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    _setValues({ ..._values, course: which?.split("_")[1] });
    if (which?.split("_")[0] === "program") {
      fetchingCourses();
    } else if (which?.split("_")[0] === "workshop") {
      fetchingWorkshops();
    }
  }, [which]);

  useEffect(() => {
    setSelectedWorkshop(enrollInto?.find((x) => x.slug === _values?.workshop));
  }, [_values?.workshop]);

  const gettingUserData = async (email) => {
    try {
      setUserLoading(true);
      const { data } = await axios.get(`${API}/user/${email}`);
      setUserByEmail(data.user);
      setFinded(data.finded);
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  const handleSubmit = async (e, dataPayload) => {
    e.preventDefault();

    let testOFCourse = test_links?.find((x) => x.slug === dataPayload?.course);

    try {
      setLoading(true);
      const payload = !finded
        ? {
            ...dataPayload,
            testLink: testOFCourse?.test,
            enrollTo: which?.split("_")[0],

            meetingId: selectedWorkshop && selectedWorkshop.meetingId,
            passcodeId: selectedWorkshop && selectedWorkshop.pascodeId,
            link: selectedWorkshop && selectedWorkshop.zoomLink,
            authorName: selectedWorkshop && selectedWorkshop?.instructor?.name,
            heading: selectedWorkshop && selectedWorkshop.title,
            meetingTiming: selectedWorkshop && selectedWorkshop.meetingTiming,
          }
        : {
            ...userByEmail,
            testLink: testOFCourse?.test,
            workshop: _values?.workshop,
            course: _values?.course,
            policyAccepted: _values?.policyAccepted,
            whatsAppphoneNumber: _values?.whatsAppphoneNumber,
            enrollTo: which?.split("_")[0],

            meetingId: selectedWorkshop && selectedWorkshop.meetingId,
            passcodeId: selectedWorkshop && selectedWorkshop.pascodeId,
            link: selectedWorkshop && selectedWorkshop.zoomLink,
            authorName: selectedWorkshop && selectedWorkshop?.instructor?.name,
            heading: selectedWorkshop && selectedWorkshop.title,
            meetingTiming: selectedWorkshop && selectedWorkshop.meetingTiming,
          };

      // console.log(payload, selectedWorkshop, "here is the payload");
      // return;

      const { data } = await axios.post(`${API}/enroll-stu`, payload);

      if (data.error) {
        return toast.error(data.error);
      }

      if (which === "workshop") {
        toast.success("Submit");
        router.push(`/`);
      } else {
        router.push(`/thanks/${testOFCourse ? testOFCourse?.slug : payload?.course}`);
      }
    } catch (err) {
      toast.error("Failed, try again", { position: "bottom-right" });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { enrollInto, userLoading, userByEmail, gettingUserData, handleSubmit, _values, _setValues, submitLoading: loading, finded };
};
