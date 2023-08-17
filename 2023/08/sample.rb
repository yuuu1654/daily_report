


=begin
    1.OptionParserオブジェクトoptを生成する
    2.オプションを取り扱うブロックをoptに登録する
    3.opt.parse(ARGV)でコマンドラインを実際にparseする   

    valueがないと、ブロック内で記述した処理の実行結果の真偽値が返ってくるだけ
=end

# オプションの定義
require 'optparse'
opt = OptionParser.new
opt.on("-m value") {|v| p v}

opt.parse(ARGV)
p ARGV

opt.parse!(ARGV)
p ARGV