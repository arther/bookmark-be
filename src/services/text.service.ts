import keyword_extractor from "keyword-extractor";

export const extractKeywords = (text: string): string[] => {
    return keyword_extractor.extract(text, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false
    });
}