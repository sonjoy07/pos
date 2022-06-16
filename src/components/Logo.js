import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  // const theme = useTheme();

  // const PRIMARY_LIGHT = theme.palette.primary.light;

  // const PRIMARY_MAIN = theme.palette.primary.main;

  // const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="30.000000pt" height="30.000000pt" viewBox="0 0 30.000000 30.000000"
        preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
          fill="#000000" stroke="none">
          <path d="M50 277 c0 -7 -9 -18 -20 -25 -18 -11 -20 -23 -20 -110 0 -85 3 -100
20 -115 26 -22 105 -23 127 -2 14 14 17 14 32 0 41 -36 109 2 96 53 -4 15 -9
53 -12 85 -3 31 -9 57 -14 57 -6 0 -7 -4 -4 -10 4 -6 -10 -10 -35 -10 -27 0
-40 4 -39 13 3 26 -2 36 -21 42 -11 3 -20 13 -20 21 0 10 -13 14 -45 14 -30 0
-45 -4 -45 -13z m80 -17 c0 -16 -7 -20 -35 -20 -28 0 -35 4 -35 20 0 16 7 20
35 20 28 0 35 -4 35 -20z m-85 -20 c-4 -6 15 -10 50 -10 39 0 54 3 49 11 -4 7
-1 10 7 7 10 -3 15 -30 17 -106 l3 -102 -76 0 -75 0 0 98 c0 54 3 102 7 105
10 11 25 8 18 -3z m215 -99 c0 -14 -5 -18 -19 -14 -10 3 -28 0 -40 -6 -19 -11
-21 -9 -21 14 0 23 4 25 40 25 33 0 40 -3 40 -19z m-22 -71 c1 -30 -11 -39
-24 -18 -4 7 -3 8 4 4 7 -4 12 -3 12 3 0 5 -5 11 -12 13 -6 2 -8 10 -4 16 13
21 23 13 24 -18z"/>
          <path d="M88 253 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z" />
          <path d="M42 188 c3 -32 4 -33 55 -36 49 -3 53 -1 59 22 9 38 -2 46 -62 46
l-55 0 3 -32z"/>
          <path d="M50 130 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
-10 -4 -10 -10z"/>
          <path d="M85 130 c-3 -5 1 -10 9 -10 9 0 16 5 16 10 0 6 -4 10 -9 10 -6 0 -13
-4 -16 -10z"/>
          <path d="M120 130 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0
-15 -4 -15 -10z"/>
          <path d="M50 94 c0 -8 5 -12 10 -9 6 3 10 10 10 16 0 5 -4 9 -10 9 -5 0 -10
-7 -10 -16z"/>
          <path d="M86 101 c-4 -5 -2 -12 3 -15 5 -4 12 -2 15 3 4 5 2 12 -3 15 -5 4
-12 2 -15 -3z"/>
          <path d="M126 101 c-4 -5 -2 -12 3 -15 5 -4 12 -2 15 3 4 5 2 12 -3 15 -5 4
-12 2 -15 -3z"/>
          <path d="M50 60 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10
-4 -10 -10z"/>
          <path d="M85 60 c3 -5 10 -10 16 -10 5 0 9 5 9 10 0 6 -7 10 -16 10 -8 0 -12
-4 -9 -10z"/>
          <path d="M125 60 c4 -6 11 -8 16 -5 14 9 11 15 -7 15 -8 0 -12 -5 -9 -10z" />
        </g>
      </svg>

    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
