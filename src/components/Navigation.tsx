import { Box, IconButton, ButtonLink, Button, Flex } from "gestalt";
import { useState } from "react";

import type { ColorSchemeType } from "../types";

interface NavigationProps {
  scheme: ColorSchemeType;
  setScheme: (scheme: ColorSchemeType) => void;
}

export const Navigation = ({ scheme, setScheme }: NavigationProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <Box>
      <Box
        role="navigation"
        direction="row"
        display="flex"
        justifyContent="end"
        paddingY={3}
      >
        <IconButton
          accessibilityLabel="Toggle color scheme"
          icon={scheme === "light" ? "moon" : "sun"}
          onClick={() => setScheme(scheme === "light" ? "dark" : "light")}
        />
        <ButtonLink
          text="GitHub"
          accessibilityLabel="GitHub"
          size="sm"
          color="transparent"
          href="https://github.com/YutaGoto/japanCityGacha"
          target="blank"
          rel="nofollow"
          iconStart="visit"
        />
        <ButtonLink
          text="市町村一覧"
          accessibilityLabel="市町村一覧"
          size="sm"
          color="transparent"
          href="https://github.com/nojimage/local-gov-code-jp/blob/ba7a68463e2c68996e6a993640c21296a9cb0785/cities.json"
          target="blank"
          rel="nofollow"
          iconStart="visit"
        />
        <Button
          text="音源"
          accessibilityLabel="音源"
          size="sm"
          iconStart="menu"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        />
      </Box>
      {showMenu && (
        <Box position="absolute"
          top
          right
          marginTop={16}
          marginEnd={6}
          display="flex"
          color="default"
          alignItems="center"
          justifyContent="center"
        >
          <Flex alignItems="end" direction="column" gap={2}>
            <ButtonLink
              text="ドラム"
              accessibilityLabel="ドラムループ"
              size="sm"
              color="transparent"
              href="https://pixabay.com/ja/sound-effects/noise-drum-loop-134bpm-245852/"
              target="blank"
              rel="nofollow"
              iconStart="audio-bars"
            />
            <ButtonLink
              text="シンバル"
              accessibilityLabel="クラッシュシンバル"
              size="sm"
              color="transparent"
              href="https://pixabay.com/ja/sound-effects/tr707-crash-cymbal-241376/"
              target="blank"
              rel="nofollow"
              iconStart="audio-bars"
            />
          </Flex>
        </Box>
      )}
    </Box>
  );
};
