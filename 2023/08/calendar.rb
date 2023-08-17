require 'date'
require 'optparse' # optparseを使えるようにする

def print_calendar(year, month)
    # 指定された月の1日と最後の日を取得
    first_day = Date.new(year, month, 1)
    last_day = Date.new(year, month, -1)

    # カレンダーのヘッダーを表示
    puts "    #{month}月 #{year}    "
    puts "日 月 火 水 木 金 土"

    # 月の1日が始まる位置までスペースを表示
    print "   " * first_day.wday

    # 月の各日を表示
    (first_day..last_day).each do |date|
        print date.day.to_s.rjust(2) + " "
        # 土曜日なら改行
        puts if date.saturday?
    end

    puts
end

# コマンドラインオプションの解析
options = {}
opt = OptionParser.new
# opt.on("-m month", Integer) do |month|
#     options[:month] = month
# end
opt.on("-m month", Integer) { |month| options[:month] = month } # 処理が1行なので{}のブロック記法を採用
opt.parse!(ARGV)

# 現在の年と月を取得
now = Date.today
year = now.year
month = options[:month] ||= now.month # 指定があった月、何も入力がなければ現在の月

# 月のバリデーション
# if month < 1 || 12 < month
#     puts "#{month} is neither a month number (1..12) nor a name"
#     exit
# end

print_calendar(year, month)