import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  quotePlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React from "react";
import { useForm, Form } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    body: yup.string().required(),
  })
  .required();

const AdminPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  const [{ prevMd, currMd }, setMarkdown] = React.useState({
    prevMd: "",
    currMd: "",
  });
  if (
    !(typeof window !== "undefined" && typeof window.document !== "undefined")
  ) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MDXEditor
        {...register("body")}
        markdown={currMd}
        // onChange={(a) => {
        //   setMarkdown((prev) => ({ prevMd: prev.currMd, currMd: a }));
        // }}
        plugins={[
          imagePlugin({
            imageUploadHandler: () => {
              return Promise.resolve("https://picsum.photos/200/300");
            },
            imageAutocompleteSuggestions: [
              "https://picsum.photos/200/300",
              "https://picsum.photos/200",
            ],
          }),
          linkPlugin(),
          linkDialogPlugin(),
          headingsPlugin(),
          quotePlugin(),
          diffSourcePlugin({
            diffMarkdown: prevMd,
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <InsertImage />
                  <CreateLink />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <BlockTypeSelect />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
      />
    </form>
  );
};

export default AdminPage;
