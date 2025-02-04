import Image from "next/image";

interface props {
  image: string;
  name: string;
  role: string;
  time?: string;
  description?: string;
}

const TeamItem: React.FC<props> = ({
  image,
  name,
  role,
  time,
  description,
}) => {
  return (
    <div className="max-h-[571px] h-full">
      <Image
        className="w-[405px] h-[405px]"
        src={image}
        width={405}
        height={405}
        style={{
          objectFit: "cover",
          objectPosition: "center", // Обрезка сверху
        }}
        alt="ivan"
      />
      <span className="text-center block text-[28px] mt-3">{name}</span>
      <p className="text-center text-[20px]">{role}</p>
      <span className="block text-center">{time}</span>
      <p className="text-center leading-[120%] text-grey mt-1">{description}</p>
    </div>
  );
};

export default TeamItem;
