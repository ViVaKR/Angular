import { Injectable } from "@angular/core";
import { ICategory } from "@app/interfaces/i-category";

@Injectable({
    providedIn: 'root'
})
export class CategoryModel implements ICategory {
    id: number = 0;
    name: string = '';
    categories: ICategory[] = [];

    addCategory(category: ICategory) {
        this.categories.push(category);
    }

    getCategories(): ICategory[] {
        return this.categories;
    }

    getCategory(id: number): ICategory | undefined {
        return this.categories.find((category) => category.id === id);
    }

    getCategoryName(id: number): string {
        const category = this.categories.find((category) => category.id === id);
        return category?.name || id.toString();
    }

    setCategories() {
        this.addCategory({ id: 1, name: "CSharp" });
        this.addCategory({ id: 2, name: "ASP.NET Core" });
        this.addCategory({ id: 3, name: "JavaScript" });
        this.addCategory({ id: 4, name: "Angular" });
        this.addCategory({ id: 5, name: "Node.Js" });
        this.addCategory({ id: 6, name: "Blazor" });
        this.addCategory({ id: 7, name: "Rust" });
        this.addCategory({ id: 8, name: "PowerShell" });
        this.addCategory({ id: 9, name: "Shell" });
        this.addCategory({ id: 10, name: "C" });
        this.addCategory({ id: 11, name: "C++" });
        this.addCategory({ id: 12, name: "R" });
        this.addCategory({ id: 13, name: "Python" });
        this.addCategory({ id: 14, name: "Java" });
        this.addCategory({ id: 15, name: "Flutter" });
        this.addCategory({ id: 16, name: "Go" });
        this.addCategory({ id: 17, name: "HTML" });
        this.addCategory({ id: 18, name: "CSS" });
        this.addCategory({ id: 19, name: "MSSQL" });
        this.addCategory({ id: 20, name: "PostgreSQL" });
        this.addCategory({ id: 21, name: "Git" });
        this.addCategory({ id: 22, name: "Docker" });
        this.addCategory({ id: 23, name: "Assembly" });
        this.addCategory({ id: 24, name: "NginX" });
        this.addCategory({ id: 25, name: "TypeScript" });
        this.addCategory({ id: 26, name: "VBA" });
        this.addCategory({ id: 27, name: "Swift" });
        this.addCategory({ id: 28, name: "MAUI" });
        this.addCategory({ id: 29, name: "NameServer" });
        this.addCategory({ id: 30, name: "Dart" });
    }
}
