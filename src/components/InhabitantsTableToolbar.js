import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import React from "react";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));


export default function  InhabitantsTableToolbar (props) {
  const classes = useToolbarStyles();

  const { filterChange } = props;

  return (
    <Toolbar
      className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Such a nice gnomes
      </Typography>
      <FormControl>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder='Search'
          onChange={e => {filterChange(e.target.value)}}
        />
      </FormControl>
    </Toolbar>
  );
};

InhabitantsTableToolbar.propTypes = {
  filterChange: PropTypes.func.isRequired,
};