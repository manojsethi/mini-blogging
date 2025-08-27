import { useEffect, useState } from "react";
import type { IPostData } from "../../interfaces/response/post";
import services from "../../utils/services";
import useApp from "antd/es/app/useApp";
import Loader from "../../components/shared/loader";
import BlogCard from "../../components/blog/card";

const Blogs = () => {
  const [blogList, setBlogList] = useState<IPostData[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const { notification } = useApp();

  const getBlogs = async () => {
    try {
      setLoader(true);
      const response = await services.getAllPosts();
      if (!response.success) {
        throw new Error(response?.error?.message ?? "Get posts failed");
      }
      setBlogList(response.data);
    } catch (error: any) {
      notification.error({
        message: error?.message ?? "Unexpected error occurs on getting posts!",
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  if (loader) {
    return <Loader className="h-[50vh]" />;
  }

  return (
    <>
      <h2 className="text-base text-primary">Blogs</h2>
      <br />
      {blogList?.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {blogList.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-36">No Blogs Yet!</p>
      )}
    </>
  );
};

export default Blogs;
