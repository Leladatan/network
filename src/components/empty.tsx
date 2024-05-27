import Box from "@/components/ui/box";

const Empty = ({classname = "", title, classname_box = ""}: {classname?: string, title: string, classname_box?: string}) => {
  return (
    <Box className={classname_box}>
      <h3 className={classname}>{title ?? "Not found"}</h3>
    </Box>
  );
};

export default Empty;