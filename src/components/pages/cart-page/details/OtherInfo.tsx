interface OtherInfoProps {
    type: string;
    name: string;
}

const OtherInfo = ({ type, name }: OtherInfoProps) => {
    return (
        <div className="title-div">
            <span className="title-div--product-type">{type}</span>
            <span className="title-div--product-name">{name}</span>
        </div>
    );
};

export default OtherInfo;
