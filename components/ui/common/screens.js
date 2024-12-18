const { Grid } = require("antd");

export const useScreens = () => {
  const { useBreakpoint } = Grid;
  const screen = useBreakpoint();

  return { screen };
};

// export const mainUps = () => {
//  return <div style={{ marginTop: screen.md ? "200px" : !screen.md && "150px" }}> {}
// }
