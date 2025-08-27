import { Button, Form, Input } from "antd";
import type { IPost } from "../../interfaces/request/post";
import type { IPostData } from "../../interfaces/response/post";

const BlogForm = ({
  handleFinish,
  loading,
  handleOnCancel,
  initialPost,
}: {
  handleFinish: (post: IPost) => void;
  loading?: boolean;
  handleOnCancel: () => void;
  initialPost?: IPostData;
}) => {
  return (
    <Form
      initialValues={initialPost}
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
    >
      <label className=" text-sm">Title</label>
      <Form.Item
        name="title"
        rules={[
          { required: true, message: "Title is required!" },
          { min: 5, message: "Title must be at least 5 characters" },
          { max: 100, message: "Title cannot exceed 100 characters" },
        ]}
      >
        <Input className="h-[35px] mt-2" placeholder="Enter post title" />
      </Form.Item>
      <label className=" text-sm">Content</label>

      <Form.Item
        name="content"
        rules={[
          { required: true, message: "Content is required!" },
          { min: 20, message: "Content must be at least 20 characters" },
          { max: 600, message: "Content cannot exceed 600 characters" },
        ]}
      >
        <Input.TextArea
          className="mt-2"
          rows={4}
          placeholder="Enter post content"
        />
      </Form.Item>

      <div className="flex justify-end gap-x-3 mt-10">
        <Button
          onClick={handleOnCancel}
          disabled={loading}
          className=" mt-2 text-base "
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          htmlType="submit"
          type="primary"
          className=" mt-2 text-base "
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default BlogForm;
