import "./Tag.scss";

interface TagProps {
    title: string;
    prefix: string;
    main_value: string;
    postfix: string;
    className?: string;
}

const Tag = ({ title, prefix, main_value, postfix, className }: TagProps) => {
    return (
        <div className={`tag ${className}`}>
            <span className="tag__title">{title}</span>
            <div className="tag__body">
                <span className="tag__body-prefix">{prefix}&nbsp;</span>
                <span className="tag__body-main-value">{main_value}</span>
                <span className="tag__body-postfix">&nbsp;{postfix}</span>
            </div>
        </div>
    );
};

export default Tag;
