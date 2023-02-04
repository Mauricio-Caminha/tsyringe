import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {

    constructor(private categoryRepository: ICategoriesRepository) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];

            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on('data', async (row) => {
                    const [name, description] = row;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on('end', () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on('error', (err) => {
                    reject(err);
                })
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            const { name, description } = category;

            const categoryAlreadyExists = await this.categoryRepository.findByName(name);

            if (!categoryAlreadyExists) {
                this.categoryRepository.create({ name, description });
            }
        })
    }
}

export { ImportCategoryUseCase };

/*
 stream = Leitura do arquivo por chunks(partes)
    boa no Node
 fs = file system
    modulo nativo do Node
 pipe = cada chunk lido pipe envia para onde definido pipe(definir)
*/