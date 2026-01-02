import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { AI_MODELS } from "../models/aiModels";

const ModelSelector = ({ selectedModel, setSelectedModel }) => {
  return (
    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
      <InputLabel>AI Model</InputLabel>
      <Select
        value={selectedModel}
        label="AI Model"
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        {AI_MODELS.map((model) => (
          <MenuItem key={model.id} value={model.endpoint}>
            {model.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModelSelector;
