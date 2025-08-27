import { Button, Divider, Form, Input, Modal } from "antd";

type CreatePostModalProps = {
  isVisible: boolean;
  handleOnClose: () => void;
  onSubmit?: (values: { title: string; content: string }) => void;
};

const CreatePostModal = ({
  handleOnClose,
  isVisible,
  onSubmit,
}: CreatePostModalProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { title: string; content: string }) => {
    try {
      // const response=await
    } catch (error) {}
  };

  return (
    <Modal
      title="Create Post"
      open={isVisible}
      onCancel={handleOnClose}
      footer={null}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input className="h-[35px]" placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Content is required!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter post content" />
        </Form.Item>

        <div className="flex justify-end gap-x-3 mt-10">
          <Button className=" mt-2 text-base ">Cancel</Button>
          <Button htmlType="submit" type="primary" className=" mt-2 text-base ">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
