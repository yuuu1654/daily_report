
fruits = ['apple', 'melon', 'orange']
numbers = [1, 2, 3]
catch :done do
    fruits.shuffle.each do |fruit|
        numbers.shuffle.each do |n|
            puts "#{fruit}, #{n}"
            if fruit == 'orange' && n == 3
                # catchと一致しないタグをthrowする
                throw :done
            end
        end
    end
end

tuuka = {japan: 'yen', us: 'dollar', india: 'rupee'}
tuuka[:italy] = 'euro'
p tuuka

tuuka.each do |key, value|
    puts "#{key}, #{value}"
end