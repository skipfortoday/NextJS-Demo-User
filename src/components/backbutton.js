import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

export default function BackButton() {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <Button
        // variant="rounded"
        color="default"
        size="small"
        startIcon={<ArrowBackIos />}
      ></Button>
    </div>
  );
}
