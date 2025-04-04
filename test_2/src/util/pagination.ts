export const paginateData = <T,>(data: T[], currentPage: number, pageSize: number): T[] => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
};