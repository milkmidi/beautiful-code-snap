import { useRef } from "react";
import CodeEditor from "./components/CodeEditor";
import { cn } from "./lib/utils";
import { fonts, themes } from "./options";
import { Card, CardContent, CardFooter } from "./components/ui/card";
import ThemeSelect from "./components/controls/ThemeSelect";
import LanguageSelect from "./components/controls/LanguageSelect";
import FontSelect from "./components/controls/FontSelect";
import FontSizeInput from "./components/controls/FontSizeInput";
import PaddingSlider from "./components/controls/PaddingSlider";
import BackgroundSwitch from "./components/controls/BackgroundSwitch";
import DarkModeSwitch from "./components/controls/DarkModeSwitch";
import useStore from "./store/store";
import { Separator } from "./components/ui/separator";
import ExportOptions from "./components/controls/ExportOptions";

function App() {
  const theme = useStore((state) => state.theme);
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);

  const editorRef = useRef(null);

  return (
    <main className="container dark min-h-screen flex flex-col items-center bg-neutral-950 text-white p-10">
      {/* Stylesheet */}
      <section>
        <link
          rel="stylesheet"
          href={themes[theme].theme}
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href={fonts[fontStyle].src}
          crossOrigin="anonymous"
        />
      </section>

      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Beautiful Code Snap
        </h2>
        <p className="text-muted-foreground">
          Generate beautiful code snippets with
          <span className="text-primary"> Flourite</span> and
          <span className="text-primary"> Highlight.js</span>
        </p>
      </div>

      {/* Options Card */}
      <Card className="my-8 mx-auto w-full px-4 py-4 bg-neutral-900/90 backdrop-blur">
        <CardContent className="flex gap-6 justify-center items-center flex-wrap">
          <ThemeSelect />
          <LanguageSelect />
          <FontSelect />
          <FontSizeInput />
          <Separator />
        </CardContent>

        <CardFooter className="flex justify-center items-center gap-6 pb-0 flex-wrap">
          <PaddingSlider />
          <div className="flex gap-6">
            <BackgroundSwitch />
            <DarkModeSwitch />
          </div>
          <div className="w-px bg-neutral-800" />
          <div className="place-self-center">
            <ExportOptions targetRef={editorRef} />
          </div>
        </CardFooter>
      </Card>

      <div
        className={cn(
          "mb-2 transition-all ease-out ",
          showBackground ? themes[theme].background : "ring ring-neutral-900"
        )}
        style={{ padding }}
        ref={editorRef}
      >
        <CodeEditor />
      </div>
    </main>
  );
}

export default App;
