define(function () {
   /**
    * Определение «родных» свойств у объекта (с конфигурацией как у стандартного свойства)
    * @param object
    * @param properties
    * @private
    */
   var defineStealthProperties = function defineStealthProperties(object, properties) {
      for (var propertyName in properties) {
         if (properties.hasOwnProperty(propertyName)) {
            var defineType = 'определить';
            if (propertyName in object)
               defineType = object.hasOwnProperty(propertyName) ? 'переопределить' : 'перекрыть';

            try {
               Object.defineProperty(object, propertyName, {
                  configurable: true,
                  enumerable  : false,
                  writable    : true,
                  value       : properties[propertyName]
               });
            } catch (e) {
               console.exception(e);
               continue;
            }

            if (object[propertyName] !== properties[propertyName]) {
               console.warn('Не удалось %s свойство %s', defineType, propertyName);
            }
         }
      }
   };

   defineStealthProperties(Object.prototype,
      /** @lends Object.prototype */
      {}
   );

   defineStealthProperties(Array.prototype,
      /** @lends Array.prototype */
      {}
   );

   defineStealthProperties(String.prototype,
      /** @lends String.prototype */
      {
         /**
          * Выравнивание строки по левому краю
          * @param {number} width целевая ширина строки
          * @param {string} [fillChar] символ-заполнитель
          * @returns {string}
          */
         lJust: function lJust(width, fillChar) {
            fillChar = (fillChar || ' ').charAt(0);
            return this + new Array(Math.max(0, width - this.length + 1)).join(fillChar);
         },

         /**
          * Выравнивание строки по правому краю
          * @param {number} width целевая ширина строки
          * @param {string} [fillChar] символ-заполнитель
          * @returns {string}
          */
         rJust: function rJust(width, fillChar) {
            fillChar = (fillChar || ' ').charAt(0);
            return new Array(Math.max(0, width - this.length + 1)).join(fillChar) + this;
         },

         /**
          * Выравнивание строки по центру
          * @param {number} width целевая ширина строки
          * @param {string} [fillChar] символ-заполнитель
          * @returns {string}
          */
         center: function center(width, fillChar) {
            fillChar = (fillChar || ' ').charAt(0);
            return this.rJust((+width + this.length) >> 1, fillChar).lJust(width, fillChar);
         }
      }
   );

   defineStealthProperties(Function.prototype,
      /** @lends Function.prototype */
      {}
   );
});
