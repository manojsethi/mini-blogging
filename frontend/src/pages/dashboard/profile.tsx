import { useContext } from "react";
import UserBlogs from "../../components/blog/userBlogs";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { auth } = useContext(AuthContext);

  return (
    auth?.user && <UserBlogs canCreate canDelete canEdit user={auth.user} />
  );
};

export default Profile;
