type StageNameOptions = {
  parts?: number;
}

const getInitials = (pseudo?: string) => {
  if (!pseudo) return ""
  return pseudo.split(" ")
  .map(word => word.charAt(0).toUpperCase())
  .join("")
  .slice(0, 2)
}

const getNameRoots = (pseudo?: string, options: StageNameOptions = {}) => {
  if (!pseudo) return ""

  const {parts = 1} = options;
  const words = pseudo.trim().split(/\s+/);

  return words.slice(0, parts).join(" ");
}

export {getInitials, getNameRoots}