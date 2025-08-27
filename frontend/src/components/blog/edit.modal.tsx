import { Divider, Modal } from "antd";
import services from "../../utils/services";
import type { IPost } from "../../interfaces/request/post";
import useApp from "antd/es/app/useApp";
import { useState } from "react";
import BlogForm from "./form";
import type { IPostData } from "../../interfaces/response/post";

type EditBlogModalProps = {
  isVisible: boolean;
  handleOnClose: () => void;
  initialPost: IPostData;
  refetch:()=>void
};

const EditBlogModal = ({
  handleOnClose,
  isVisible,
  initialPost,
  refetch
}: EditBlogModalProps) => {
  const { notification } = useApp();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinish = async (values: IPost) => {
    try {
      setLoading(true);
      const response = await services.editPost(initialPost._id,values);

      if (!response?.success) {
        throw new Error(response?.error?.message || "Create Blog failed!");
      }
      notification.success({
        message: "Success",
        description: "Blog updated successfully.",
      });
      refetch();
      handleOnClose();
    } catch (error: any) {
      notification.error({
        message: "Update Post Failed",
        description:
          error?.message ?? "Unexpected error occurred at update blog!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Blog"
      open={isVisible}
      onCancel={handleOnClose}
      footer={null}
    >
      <Divider />
      <BlogForm
        initialPost={initialPost}
        handleOnCancel={handleOnClose}
        loading={loading}
        handleFinish={handleFinish}
      />
    </Modal>
  );
};

export default EditBlogModal;
