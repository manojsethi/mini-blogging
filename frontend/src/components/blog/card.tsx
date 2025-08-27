import { Button, Card } from "antd";
import { useContext } from "react";
import type { IPostData } from "../../interfaces/response/post";
import { AuthContext } from "../../context/authContext";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const BlogCard = ({
  blog,
  handleOnEdit,
  handleOnDelete,
}: {
  blog: IPostData;
  handleOnEdit?: () => void;
  handleOnDelete?: () => void;
}) => {
  const { auth } = useContext(AuthContext);
  return (
    <Card className="relative">
      <h3 className="text-xl font-semibold">{blog.title}</h3>
      <p className="mt-3 text-lg">{blog.content}</p>
      <p className="text-sm text-primary mt-3">
        {blog.author._id === auth?.user.id ? (
          <span className="text-green-600">You</span>
        ) : (
          <>
            {blog.author.email} {`(${blog.author.username})`}
          </>
        )}
      </p>
      <div className="absolute top-0 right-1">
        <div className="flex gap-x-3">
          {handleOnEdit && (
            <Button
              onClick={handleOnEdit}
              className=" text-primary"
              type="text"
              icon={<EditFilled />}
            />
          )}
          {handleOnDelete && (
            <Button
              onClick={handleOnDelete}
              className=" text-red-500"
              type="text"
              icon={<DeleteFilled />}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
