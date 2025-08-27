import { Divider, Modal } from "antd";
import services from "../../utils/services";
import type { IPost } from "../../interfaces/request/post";
import useApp from "antd/es/app/useApp";
import { useState } from "react";
import BlogForm from "./form";

type CreateBlogModalProps = {
  isVisible: boolean;
  handleOnClose: () => void;
  refetch:()=>void
};

const CreateBlogModal = ({
  handleOnClose,
  isVisible,
  refetch
}: CreateBlogModalProps) => {
  const { notification } = useApp();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinish = async (values: IPost) => {
    try {
      setLoading(true);
      const response = await services.createPost(values);

      if (!response?.success) {
        throw new Error(response?.error?.message || "Create blog failed!");
      }
      
      notification.success({
        message: "Success",
        description: "Blog created successfully.",
      });
      refetch();
      handleOnClose();
    } catch (error: any) {
      notification.error({
        message: "Blog Post Failed",
        description:
          error?.message ?? "Unexpected error occurred at create blog!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Blog"
      open={isVisible}
      onCancel={handleOnClose}
      footer={null}
    >
      <Divider />
      <BlogForm
        handleOnCancel={handleOnClose}
        loading={loading}
        handleFinish={handleFinish}
      />
    </Modal>
  );
};

export default CreateBlogModal;
