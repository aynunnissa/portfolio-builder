interface IProps {
  customClass: string;
  rtl: boolean;
}

const Skeleton = ({ customClass, rtl }: IProps) => {
  return (
    <div
      className={`bg-[#e7e7e7] rounded-2xl relative overflow-hidden bg-skeleton ${customClass} ${
        rtl ? 'rtl' : ''
      }`}
    ></div>
  );
};

export default Skeleton;
