import {
  DownloadIcon,
  ImageIcon,
  Link2Icon,
  Share2Icon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toBlob, toPng, toSvg } from "html-to-image";
import { toast } from "sonner";
import useStore from "@/store/store";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "../ui/button";

type SaveImageType = {
  name: string;
  format: "PNG" | "SVG";
};

type ExportOptionsProps = {
  targetRef: React.RefObject<HTMLDivElement>;
};

export default function ExportOptions({ targetRef }: ExportOptionsProps) {
  const title = useStore((state) => state.title);

  const processImage = async (processor: any) => {
    if (targetRef.current) {
      return processor(targetRef.current, { pixelRatio: 2 });
    }
    throw new Error("Target ref is null.");
  };

  const copyImage = async () => {
    try {
      const imgBlob = await processImage(toBlob);
      navigator.clipboard.write([new ClipboardItem({ "image/png": imgBlob })]);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const copyLink = () => {
    try {
      const state = useStore.getState();
      const stringifiedState = Object.fromEntries(
        Object.entries(state).map(([key, value]) => [key, String(value)])
      );

      const params = new URLSearchParams({
        ...stringifiedState,
        code: btoa(state.code),
      });

      navigator.clipboard.writeText(`${location.href}?${params}`);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const saveImage = async ({ name, format }: SaveImageType) => {
    try {
      const imgProcessor = format === "PNG" ? toPng : toSvg;
      const imgURL = await processImage(imgProcessor);
      const a = document.createElement("a");
      a.href = imgURL;
      a.download = `${name}.${format.toLowerCase()}`;
      a.click();
      toast.success(`Image saved as ${format}`);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useHotkeys("ctrl+c", copyImage);
  useHotkeys("shift+ctrl+c", copyLink);
  useHotkeys("ctrl+s", () => saveImage({ name: title, format: "PNG" }));
  useHotkeys("shift+ctrl+s", () => saveImage({ name: title, format: "SVG" }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share2Icon className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuItem className="gap-2" onClick={copyImage}>
          <ImageIcon />
          Copy Image
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" onClick={copyLink}>
          <Link2Icon />
          Copy Link
          <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage({ name: title, format: "PNG" })}
        >
          <DownloadIcon />
          Save as PNG
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage({ name: title, format: "SVG" })}
        >
          <DownloadIcon />
          Save as SVG
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
