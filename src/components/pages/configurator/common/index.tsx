import { IPart } from "@/interfaces/types-v2";

export const alignGridItemWidth = () => {
    const items: NodeListOf<HTMLUListElement> = document.querySelectorAll("ul");
    items.forEach((item) => {
        const labels = item.querySelectorAll("label");
        labels.forEach((label) => {
            const footer = label?.parentElement
                ?.nextElementSibling as HTMLElement;
            if (footer) {
                const gridLabelWidth = label.offsetWidth; // Получаем ширину label
                footer.style.width = `${gridLabelWidth}px`; // Устанавливаем ширину для footer
            }
        });
    });
};

export const filterItems = (
    e: any,
    parts: IPart[],
    setter: (items: IPart[]) => void
) => {
    const btn = e.target;
    const part_name = btn.id;

    part_name === "all"
        ? setter(parts)
        : setter(parts.filter((item) => item.partitions.label === part_name));

    const allBtns: NodeListOf<HTMLButtonElement> =
        btn.parentElement.querySelectorAll(
            ".item-body__dashboard-filter-button"
        );
    allBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
};
