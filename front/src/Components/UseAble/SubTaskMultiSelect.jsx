import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector, useDispatch } from "react-redux";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {editNewSubTask} from "../../Redux/taskReducer";


const schema = yup.object().shape({
  selectedItems: yup.array().min(1, "At least one item must be selected"),
});

export default function SubTaskMultiSelect({ options, currentTask }) {
  const { control, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      selectedItems: options,
    },
  });
  const { userList } = useSelector((state) => state.Users);
  const { user } = useSelector((state) => state.Auth);
  const selectedCustomerIds = React.useRef([]);
  const diapatch = useDispatch()
  const handleBlur = () => {
    handleSubmit((data) => {
      diapatch(editNewSubTask({ customer: data.selectedItems, id: currentTask.id, user_id: user.user_id}))
    })();
  };

  const handleSelectionChange = (event, value) => {
    const selectedItems = [];
    const selectedIds = [];

    value.forEach((item) => {
      if (!selectedIds.includes(item.id)) {
        selectedItems.push({ id: item.id, name: item.name });
        selectedIds.push(item.id);
      }
    });
    selectedCustomerIds.current = selectedIds; // Update selectedCustomerIds.current
    setValue("selectedItems", selectedItems);
  };

  const isCustomerSelected = (id) => selectedCustomerIds.current.includes(id);

  return (
    <form>
      <Controller
        name="selectedItems"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            sx={{ width: 250 }}
            multiple
            disabled={user.role === "Cliente" ? true : false}
            options={userList}
            getOptionLabel={(option) => option.name}
            disableCloseOnSelect
            value={field.value}
            // onBlur={handleBlur}

            onChange={(event, value) => {
              handleSelectionChange(event, value);
              handleBlur()
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Asignado"
                error={!!formState.errors.selectedItems}
                helperText={formState.errors.selectedItems?.message}
              />
            )}
            renderOption={(props, option, { selected }) => (
              <MenuItem
                {...props}
                key={option.id}
                value={option}
                onChange={() => console.log('helo')}
                sx={{
                  justifyContent: "space-between",
                  backgroundColor: selected ? "#e0e0e0" : "inherit",
                }}
              >
                {option.name}
                {/* { option.role==="Digitador"?'   (digitador)':'   (cliente)' } */}
                {`(${option.role})`}
                {isCustomerSelected(option.id) ? <CheckIcon color="info" /> : null}
              </MenuItem>
            )}
          />
        )}
      />
    </form>
  );
}
