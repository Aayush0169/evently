import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req: Request) => {
  return { id: "fakeId" }; 
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      try {
        const user = await auth(req);
        if (!user) throw new UploadThingError("Unauthorized");
        return { userId: user.id };
      } catch (err) {
        console.error("Middleware error:", err);
        throw err;
      }
    })
.onUploadComplete(async ({ metadata, file }) => {
  try {
    console.log("✅ Uploaded file:", file);
    console.log("✅ Uploaded by:", metadata?.userId);
    return { uploadedBy: metadata?.userId };
  } catch (err) {
    console.error(" Error in onUploadComplete:", err);
    throw err;
  }
})


} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
