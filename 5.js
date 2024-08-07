// Мементо (Memento) — це патерн програмування, який забезпечує збереження стану об'єкта для подальшого відновлення

// Клас Writer відповідає за роботу з текстом.
class Writer {
  #content = "";  // Властивість #content представляє поточний текст. Вона ініціалізується порожнім рядком.
  // Сетер для властивості content. Він приймає значення newContent (новий текст),
  // який потрібно встановити як поточний текст. Кожен раз, коли присвоюється нове значення,
  // викликається метод #store(), який зберігає поточний стан тексту у версіях.
  set content(newContent) {
    this.#content = newContent;
    this.#store(); 
  }  
  
  get content() {
    return this.#content;  // Метод гетер для властивості content, повертає this.#content.
  }
  
  #store() {
    Version.create(this.#content); // Приватний метод #store використовується для зберігання поточного стану тексту.
  // Він викликає статичний метод класу Version, create, передаючи йому поточний текст як аргумент.
  }
  
  
  restore() {
    const previousContent = Version.restore(); // Метод restore відновлює попередній стан тексту, викликаючи статичний метод класу Version, restore.
    if (previousContent !== null) {
      this.#content = previousContent; // Цей метод повертає останню збережену версію тексту, яку ми встановлюємо як поточний текст.
    }
  }
}

// Клас Version відповідає за створення та зберігання версій тексту.
class Version {
  #content; // В конструкторі класу Version приймається аргумент content та встановлює його.
  // Це вхідний аргумент, який представляє теку збережену версію тексту.
  static #versions = [];  // Властивість #versions це приватний статичний масив, пустий за замовчуванням, що зберігає всі створені версії.
  constructor(content) {
    this.#content = content;
  }

  static create(content) {
    const version = new Version(content); // Статичний метод create приймає аргумент content (текст версії) і створює новий екземпляр класу Version в який передає content.
    this.#versions.push(version); // Створений екземпляр додається до масиву версій versions.
  }

  static restore() {
    this.#versions.pop(); // Статичний метод restore видаляє останний елемент масиву
    if (this.#versions.length > 0) {
      return this.#versions[this.#versions.length - 1].#content; // Повертає останню збережену версію тексту з масиву версій.
    } else {
      return null;
    }
  }
}

console.log("Завдання 5 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо новий екземпляр класу Writer
const writer = new Writer();

// Присвоюємо текст за допомогою сетера
writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

// Друкуємо поточний текст
console.log(writer.content);

// Відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюємо попередній текст
writer.restore();
console.log(writer.content);
