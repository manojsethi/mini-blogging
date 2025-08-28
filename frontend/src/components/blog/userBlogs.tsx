import { Avatar, Button, Card } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import services from "../../utils/services";
import type { IPostData } from "../../interfaces/response/post";
import useApp from "antd/es/app/useApp";
import { PlusOutlined } from "@ant-design/icons";
import CreateBlogModal from "./create.modal";
import Loader from "../shared/loader";
import BlogCard from "./card";
import EditBlogModal from "./edit.modal";
import type { IUserData } from "../../interfaces/response/user";

const UserBlogs = ({
  canDelete,
  canEdit,
  user,
  canCreate,
}: {
  canEdit?: boolean;
  canDelete?: boolean;
  user: IUserData;
  canCreate?: boolean;
}) => {
  const { auth } = useContext(AuthContext);
  const [loader, setLoader] = useState<boolean>(false);
  const [blogList, setBlogList] = useState<IPostData[]>([]);
  const [editPost, setEditPost] = useState<IPostData | null>(null);
  const {
    notification,
    modal: { confirm },
  } = useApp();
  const [isCreateBlog, setIsCreateBlog] = useState<boolean>(false);

  const handleDeleteBlog = async (id: string) => {
    try {
      const response = await services.deleteBlog(id);

      if (!response.success) {
        throw new Error(response?.error?.message ?? "Delete post failed");
      }
      notification.success({
        message: "Success",
        description: "Blog deleted successfully.",
      });
      getMyBlogs();
    } catch (error: any) {
      notification.error({
        message: error?.message ?? "Unexpected error occurs on deleting post!",
      });
    }
  };

  const getMyBlogs = async () => {
    try {
      setLoader(true);
      const response = await services.getUserBlogs(user._id);

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
    getMyBlogs();
  }, []);

  if (loader) {
    return <Loader className="h-[5vh]" />;
  }

  const hasBlogs = blogList?.length > 0;
  return (
    <>
      <div className=" w-full max-w-[600px]">
        <Card>
          <div className="flex justify-center">
            <Avatar size={150} />
          </div>
          <p className="text-center text-lg mt-4">{auth?.user.email}</p>
          <p className="text-center text-base mt-2 text-primary">
            {auth?.user.username}
          </p>
        </Card>
      </div>
      <br />
      <br />
      <div className={hasBlogs ? "flex justify-between" : ""}>
        {hasBlogs && <h2 className="text-base text-primary">My Blogs</h2>}
        {canCreate && (
          <div className={!hasBlogs ? "flex justify-end" : ""}>
            <Button
              onClick={() => {
                setIsCreateBlog(true);
              }}
              type="primary"
              icon={<PlusOutlined />}
            >
              Blog
            </Button>
          </div>
        )}
      </div>
      {hasBlogs ? (
        <>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mt-2">
            {blogList.map((blog) => (
              <BlogCard
                handleOnEdit={
                  canEdit
                    ? () => {
                        setEditPost(blog);
                      }
                    : undefined
                }
                handleOnDelete={
                  canDelete
                    ? () => {
                        confirm({
                          title: "Do you want to delete this blog?",
                          type: "confirm",
                          onOk: async () => await handleDeleteBlog(blog._id),
                        });
                      }
                    : undefined
                }
                blog={blog}
                key={blog._id}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center mt-36">No Blogs Yet!</p>
      )}
      {isCreateBlog && (
        <CreateBlogModal
          refetch={getMyBlogs}
          isVisible={isCreateBlog}
          handleOnClose={() => {
            setIsCreateBlog(false);
          }}
        />
      )}

      {editPost && (
        <EditBlogModal
          refetch={getMyBlogs}
          initialPost={editPost}
          isVisible={!!editPost}
          handleOnClose={() => {
            setEditPost(null);
          }}
        />
      )}
    </>
  );
};

export default UserBlogs;
